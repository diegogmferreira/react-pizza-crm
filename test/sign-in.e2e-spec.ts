import { expect, test } from '@playwright/test';

test('sign in successfully', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: "networkidle"})

  await page.getByLabel('Email').fill('john@doe.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Enviamos um link de autenticação para seu e-mail!')

  await expect(toast).toBeVisible()

  // await page.waitForTimeout(2000)
})

test('sign in wrong credentials', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: "networkidle"})

  await page.getByLabel('Email').fill('example@example.com')
  await page.getByRole('button', { name: 'Acessar painel' }).click()

  const toast = page.getByText('Não foi possível autenticar!')
  
  await expect(toast).toBeVisible()

  // await page.waitForTimeout(2000)
})

test('navigate to new restaurant page', async ({ page }) => {
  await page.goto('/sign-in', {waitUntil: "networkidle"})

  await page.getByRole('link', { name: 'Novo estabelecimento?' }).click()

  expect(page.url()).toContain('sign-up')

  // await page.waitForTimeout(2000)
})