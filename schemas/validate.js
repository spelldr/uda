#!/usr/bin/env node

/**
 * UDA Content Validator
 *
 * Validates UDA markdown files against the JSON schema.
 * Usage: node validate.js [files...]
 * If no files specified, validates all examples/*.md
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Ajv = require('ajv');
const yaml = require('js-yaml');

// Load schema
const schemaPath = path.join(__dirname, 'uda-content.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Initialize validator with draft 2020-12 support
// Remove the $schema reference since we're validating content, not meta-schema
const schemaCopy = { ...schema };
delete schemaCopy.$schema;

const ajv = new Ajv();
const validate = ajv.compile(schemaCopy);

/**
 * Extract YAML frontmatter from markdown file
 */
function extractFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Handle both LF and CRLF line endings
  const match = content.match(/^-{3}\r?\n([\s\S]*?)\r?\n-{3}/);
  
  if (!match) {
    throw new Error(`No frontmatter found in ${filePath}`);
  }

  try {
    return yaml.load(match[1]);
  } catch (error) {
    throw new Error(`Invalid YAML frontmatter in ${filePath}: ${error.message}`);
  }
}

/**
 * Validate file structure
 */
function validateFile(filePath) {
  try {
    const frontmatter = extractFrontmatter(filePath);
    const valid = validate(frontmatter);

    if (!valid) {
      const errors = validate.errors.map(err => 
        `- ${err.instancePath || 'root'}: ${err.message}`
      ).join('\n');
      
      throw new Error(`Schema validation failed:\n${errors}`);
    }

    return { valid: true, data: frontmatter };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

/**
 * Validate filename convention (loose: lowercase, hyphens)
 */
function validateFilename(filePath) {
  const basename = path.basename(filePath, '.md');
  
  // Check if lowercase with hyphens
  if (!/^[a-z0-9\-]+$/.test(basename)) {
    return {
      valid: false,
      error: `Filename "${basename}" should be lowercase with hyphens only (no spaces or uppercase)`
    };
  }

  return { valid: true };
}

/**
 * Main validation function
 */
function main() {
  let files = process.argv.slice(2);

  // If no arguments provided, validate all examples
  if (files.length === 0) {
    files = glob.sync('examples/**/*.md');
  } else if (files[0].includes('*')) {
    // If glob pattern provided, expand it
    files = glob.sync(files.join(' '));
  }

  if (files.length === 0) {
    console.log('No files to validate');
    process.exit(0);
  }

  console.log(`Validating ${files.length} file(s)...\n`);

  let failures = 0;

  files.forEach(filePath => {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      failures++;
      return;
    }

    // Validate filename
    const filenameResult = validateFilename(filePath);
    if (!filenameResult.valid) {
      console.error(`❌ Filename validation failed for ${filePath}:`);
      console.error(`   ${filenameResult.error}`);
      failures++;
      return;
    }

    // Validate file structure
    const result = validateFile(filePath);
    if (!result.valid) {
      console.error(`❌ Validation failed for ${filePath}:`);
      console.error(`   ${result.error}`);
      failures++;
      return;
    }

    console.log(`✓ ${filePath}`);
    console.log(`  Type: ${result.data.type} | Title: ${result.data.title} | Version: ${result.data.version}`);
  });

  if (failures > 0) {
    console.error(`\n❌ ${failures} file(s) failed validation`);
    process.exit(1);
  }

  console.log(`\n✅ All ${files.length} files passed schema validation`);
}

main();
