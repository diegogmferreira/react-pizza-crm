import { expect, test } from '@playwright/test';

test('sign up successfully', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: "networkidle"})

  await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Seu email' }).fill('john@doe.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('+5511999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Restaurante cadastrado com sucesso!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Login' }).click()

  expect(page.url()).toContain('sign-in')
})

test('sign up wrong Name', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: "networkidle"})

  await page.getByLabel('Nome do estabelecimento').fill('Incorrect name')
  await page.getByRole('textbox', { name: 'Seu nome' }).fill('John Doe')
  await page.getByRole('textbox', { name: 'Seu email' }).fill('john@doe.com')
  await page.getByRole('textbox', { name: 'Seu celular' }).fill('+5511999999999')

  await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

  const toast = page.getByText('Não foi possível cadastrar o restaurante!')

  await expect(toast).toBeVisible()
})

test('navigate to login page', async ({ page }) => {
  await page.goto('/sign-up', {waitUntil: "networkidle"})

  await page.getByRole('link', { name: 'Ja tem uma conta?' }).click()

  expect(page.url()).toContain('sign-in')

  // await page.waitForTimeout(2000)
})