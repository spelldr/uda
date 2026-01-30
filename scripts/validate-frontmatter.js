#!/usr/bin/env node

/**
 * UDA Frontmatter Validator
 *
 * Validates that all markdown files have proper YAML frontmatter with required fields.
 * Usage: node scripts/validate-frontmatter.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const glob = require('glob');

const requiredFields = ['type', 'title', 'version'];
const validTypes = ['task', 'concept', 'reference', 'troubleshooting'];

/**
 * Extract and validate YAML frontmatter from markdown file
 */
function validateFrontmatter(filePath) {
  try {
    // Skip governance and infrastructure docs (they don't need UDA frontmatter)
    const skipPatterns = [
      'docs',
      'README',
      'UDA Foundations'
    ];

    if (skipPatterns.some(pattern => filePath.includes(pattern))) {
      return {
        valid: true,
        skipped: true
      };
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    // Match frontmatter with flexible line endings (handles both \n and \r\n)
    const match = content.match(/^-{3}\r?\n([\s\S]*?)\r?\n-{3}/);

    if (!match) {
      return {
        valid: false,
        error: `No frontmatter found`
      };
    }

    let frontmatter;
    try {
      frontmatter = yaml.load(match[1]);
    } catch (error) {
      return {
        valid: false,
        error: `Invalid YAML frontmatter: ${error.message}`
      };
    }

    // Check required fields
    for (const field of requiredFields) {
      if (!(field in frontmatter)) {
        return {
          valid: false,
          error: `Missing required field: "${field}"`
        };
      }
    }

    // Validate type
    if (!validTypes.includes(frontmatter.type)) {
      return {
        valid: false,
        error: `Invalid type "${frontmatter.type}". Must be one of: ${validTypes.join(', ')}`
      };
    }

    // Validate version (semantic versioning)
    if (!/^\d+\.\d+\.\d+$/.test(frontmatter.version)) {
      return {
        valid: false,
        error: `Invalid version "${frontmatter.version}". Must be semantic (e.g., 1.0.0)`
      };
    }

    // Validate title
    if (!frontmatter.title || frontmatter.title.length === 0) {
      return {
        valid: false,
        error: `Title cannot be empty`
      };
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: `Error reading file: ${error.message}`
    };
  }
}

/**
 * Main validation function
 */
function main() {
  // Find all markdown files (except node_modules, .git, etc.)
  const files = glob.sync('**/*.md', {
    ignore: ['node_modules/**', '.git/**', '.github/**', '.obsidian/**']
  });

  if (files.length === 0) {
    console.log('No markdown files found');
    process.exit(0);
  }

  console.log(`Validating frontmatter in ${files.length} markdown files...\n`);

  let failures = 0;
  let skipped = 0;
  const results = files.map(file => {
    const result = validateFrontmatter(file);
    if (result.skipped) {
      skipped++;
      console.log(`⊘ ${file} (skipped - governance/infrastructure doc)`);
    } else if (!result.valid) {
      failures++;
      console.error(`❌ ${file}`);
      console.error(`   ${result.error}\n`);
    } else {
      console.log(`✓ ${file}`);
    }
    return result;
  });

  if (failures > 0) {
    console.error(`\n❌ ${failures} file(s) failed frontmatter validation`);
    process.exit(1);
  }

  const validated = files.length - skipped;
  console.log(`\n✅ All ${validated} UDA files have valid frontmatter (${skipped} governance docs skipped)`);
  process.exit(0);
}

main();
