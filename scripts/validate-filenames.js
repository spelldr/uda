#!/usr/bin/env node

/**
 * UDA Filename Validator
 *
 * Validates that all markdown files follow the naming convention (lowercase, hyphens).
 * Usage: node scripts/validate-filenames.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

/**
 * Validate filename convention (loose: lowercase, hyphens only)
 */
function validateFilename(filePath) {
  // Skip governance and infrastructure docs
  const skipPatterns = [
    'docs',
    'README',
    'UDA Foundations',
    '.template',
    '.annotated'
  ];

  if (skipPatterns.some(pattern => filePath.includes(pattern))) {
    return {
      valid: true,
      skipped: true
    };
  }

  const basename = path.basename(filePath, '.md');

  // Check if lowercase with hyphens and numbers only
  if (!/^[a-z0-9\-]+$/.test(basename)) {
    return {
      valid: false,
      error: `Filename should be lowercase with hyphens only (no spaces or uppercase letters). Got: "${basename}"`
    };
  }

  // Check that it's not just hyphens or numbers
  if (!/[a-z]/.test(basename)) {
    return {
      valid: false,
      error: `Filename must contain at least one letter. Got: "${basename}"`
    };
  }

  return { valid: true };
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

  console.log(`Validating filenames for ${files.length} markdown files...\n`);

  let failures = 0;
  let skipped = 0;
  files.forEach(file => {
    const result = validateFilename(file);
    if (result.skipped) {
      skipped++;
      console.log(`⊘ ${file} (skipped - infrastructure/template file)`);
    } else if (!result.valid) {
      failures++;
      console.error(`❌ ${file}`);
      console.error(`   ${result.error}\n`);
    } else {
      console.log(`✓ ${file}`);
    }
  });

  if (failures > 0) {
    console.error(`\n❌ ${failures} file(s) failed filename validation`);
    process.exit(1);
  }

  const validated = files.length - skipped;
  console.log(`\n✅ All ${validated} UDA files have valid filenames (${skipped} infrastructure files skipped)`);
  process.exit(0);
}

main();
