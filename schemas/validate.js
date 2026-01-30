#!/usr/bin/env node

/**
 * UDA Content Validator
 *
 * Validates UDA markdown files against the JSON schema.
 * Usage: node validate.js <file.md> [--fix]
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const yaml = require('js-yaml');

// Load schema
const schemaPath = path.join(__dirname, 'uda-content.schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

// Initialize validator
const ajv = new Ajv();
const validate = ajv.compile(schema);

/**
 * Extract YAML frontmatter from markdown file
 */
function extractFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  
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
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node validate.js <file.md> [--fix]');
    process.exit(1);
  }

  const filePath = args[0];
  const shouldFix = args.includes('--fix');

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  // Validate filename
  const filenameResult = validateFilename(filePath);
  if (!filenameResult.valid) {
    console.error(`❌ Filename validation failed: ${filenameResult.error}`);
    process.exit(1);
  }

  // Validate file structure
  const result = validateFile(filePath);

  if (!result.valid) {
    console.error(`❌ Validation failed for ${filePath}:`);
    console.error(result.error);
    process.exit(1);
  }

  console.log(`✅ Validation passed for ${filePath}`);
  console.log(`   Type: ${result.data.type}`);
  console.log(`   Title: ${result.data.title}`);
  console.log(`   Version: ${result.data.version}`);
  process.exit(0);
}

main();
