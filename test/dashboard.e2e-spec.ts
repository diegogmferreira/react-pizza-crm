import { expect, test } from '@playwright/test';

test('display days orders amount correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  expect(page.getByText('20+10% em relação ao dia')).toBeVisible()
})

test('display canceled monthly orders amount correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  expect(page.getByText('300-10% em relação ao mês')).toBeVisible()
})

test('monthly orders amount correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  expect(page.getByText('180+54% em relação ao mês')).toBeVisible()
})

test('monthly revenue amount correctly', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  expect(page.getByText('R$ 10.238,23-10% em relação')).toBeVisible()
})