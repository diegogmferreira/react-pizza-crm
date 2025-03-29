import { expect, test } from '@playwright/test';

test('update profile successfully', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  expect(page.getByRole('button', { name: 'Pizza Hut' })).toContainText('Pizza Hut')

  await page.getByRole('button', { name: 'Pizza Hut' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Pizza Hut 2')
  await page.getByLabel('Descrição').fill('Another description')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Perfil atualizado com sucesso!')

  await expect(toast).toBeVisible()

  await page.getByRole('button', { name: 'Close' }).click()

  await expect(page.getByRole('button', { name: 'Pizza Hut 2' })).toContainText('Pizza Hut 2')
})

test('update profile with wrong name', async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" })

  await page.getByRole('button', { name: 'Pizza Hut' }).click()
  await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

  await page.getByLabel('Nome').fill('Wrong name')
  await page.getByLabel('Descrição').fill('Another description')
  await page.getByRole('button', { name: 'Salvar' }).click()

  await page.waitForLoadState('networkidle')

  const toast = page.getByText('Não foi possível atualizar o perfil!')

  await expect(toast).toBeVisible()
})