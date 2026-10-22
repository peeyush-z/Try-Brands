/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { SEED_CLIENTS, SEED_REELS, SEED_CASE_STUDIES, SEED_CAPABILITIES } from './seedData.ts';

test('seed data contains global enterprise client brands including ShaastraYog', () => {
  assert.ok(SEED_CLIENTS.length >= 10, 'Should have at least 10 client brands for the marquee');
  
  const shaastra = SEED_CLIENTS.find(c => c.id === 'client-shaastrayog');
  assert.ok(shaastra, 'ShaastraYog client must exist');
  assert.equal(shaastra?.name, 'ShaastraYog');
  assert.equal(shaastra?.industry, 'Ayurvedic & Herbal Products');
  assert.ok(shaastra?.logoUrl, 'ShaastraYog must have a logo URL');
  assert.ok(shaastra?.websiteUrl, 'ShaastraYog must have a website URL');

  SEED_CLIENTS.forEach((client, idx) => {
    assert.ok(client.id, `Client at index ${idx} must have an ID`);
    assert.ok(client.name, `Client at index ${idx} must have a name`);
    assert.ok(client.industry, `Client at index ${idx} must have an industry`);
    assert.ok(client.impactMetric, `Client at index ${idx} must have an impact metric`);
    assert.equal(client.isActive, true, `Client ${client.name} should default to active`);
  });
});

test('seed reels are configured with 9:16 aspect ratio and valid media', () => {
  assert.ok(SEED_REELS.length >= 4, 'Should have multiple short-form vertical reels');
  
  const shilajitReel = SEED_REELS.find(r => r.id === 'reel-shaastrayog-shilajit');
  assert.ok(shilajitReel, 'ShaastraYog Shilajit reel must exist');
  assert.equal(shilajitReel?.client, 'ShaastraYog');
  assert.ok(shilajitReel?.externalUrl, 'Shilajit reel must have external URL');

  SEED_REELS.forEach((reel) => {
    assert.equal(reel.aspectRatio, '9:16');
    assert.ok(reel.videoUrl.startsWith('http') || reel.videoUrl.startsWith('/'), 'Video URL must be a valid link');
    assert.ok(reel.thumbnailUrl.startsWith('http') || reel.thumbnailUrl.startsWith('/'), 'Thumbnail URL must be valid');
    assert.ok(reel.client.length > 0, 'Reel must have a client attribution');
    assert.ok(reel.tags.length > 0, 'Reel must have tags');
  });
});

test('case studies include challenge, solution, deliverables, and ROI metrics', () => {
  assert.ok(SEED_CASE_STUDIES.length >= 4);
  
  SEED_CASE_STUDIES.forEach((cs) => {
    assert.ok(cs.challenge.length > 20, `${cs.client} should have detailed challenge`);
    assert.ok(cs.solution.length > 20, `${cs.client} should have detailed solution`);
    assert.ok(cs.deliverables.length >= 3, `${cs.client} should have at least 3 deliverables`);
    assert.ok(cs.metrics.length >= 2, `${cs.client} should have verified quantitative metrics`);
  });
});

test('capability services matrix contains core agency disciplines', () => {
  assert.equal(SEED_CAPABILITIES.length, 4);
  const titles = SEED_CAPABILITIES.map((c) => c.title);
  assert.ok(titles.some((t) => t.includes('Brand Identity')));
  assert.ok(titles.some((t) => t.includes('Immersive 3D')));
  assert.ok(titles.some((t) => t.includes('High-Velocity Motion')));
  assert.ok(titles.some((t) => t.includes('Category Dominance')));
});
