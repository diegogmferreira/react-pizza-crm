import { expect, test } from '@playwright/test';

test('List orders successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: "networkidle" })

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()
})

test('Paginate orders successfully', async ({ page }) => {
  await page.goto('/orders', { waitUntil: "networkidle" })

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()
  expect(page.getByText('Página 1 de')).toBeVisible()
  
  await page.getByRole('button', { name: 'Próxima página' }).click()
  
  expect(page.getByRole('cell', { name: 'Customer 11' })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 20', exact: true })).toBeVisible()
  expect(page.getByText('Página 2 de')).toBeVisible()

  await page.getByRole('button', { name: 'Última página' }).click()

  expect(page.getByRole('cell', { name: 'Customer 51' })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 60', exact: true })).toBeVisible()
  expect(page.getByText('Página 6 de')).toBeVisible()
})

test('Filter by order id', async ({ page }) => {
  await page.goto('/orders', { waitUntil: "networkidle" })

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'order-10', exact: true })).toBeVisible()

  await page.getByRole('textbox', { name: 'ID do pedido' }).fill('order-21')
  await page.getByRole('button', { name: 'Pesquisar' }).click()

  expect(page.getByRole('cell', { name: 'order-1', exact: true })).toBeHidden()
  expect(page.getByRole('cell', { name: 'order-10', exact: true })).toBeHidden()
  expect(page.getByRole('cell', { name: 'order-21', exact: true })).toBeVisible()
})

test('Filter by customer name', async ({ page }) => {
  await page.goto('/orders', { waitUntil: "networkidle" })

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeVisible()
  expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeVisible()

  await page.getByRole('textbox', { name: 'Nome do cliente' }).fill('Customer 21')
  await page.getByRole('button', { name: 'Pesquisar' }).click()

  expect(page.getByRole('cell', { name: 'Customer 1', exact: true })).toBeHidden()
  expect(page.getByRole('cell', { name: 'Customer 10', exact: true })).toBeHidden()
  expect(page.getByRole('cell', { name: 'Customer 21', exact: true })).toBeVisible()
})

test('Filter by status', async ({ page }) => {
  await page.goto('/orders', { waitUntil: "networkidle" })

  expect(page.getByText('Cancelado').nth(1)).toBeVisible()
  expect(page.getByText('Pendente').nth(1)).toBeVisible()
  expect(page.getByText('Em preparo').nth(1)).toBeVisible()
  expect(page.getByText('Entregando').nth(1)).toBeVisible()
  expect(page.getByText('Entregue').nth(1)).toBeVisible()


  await page.getByRole('combobox').click()
  await page.getByLabel('Entregue').click()
  await page.getByRole('button', { name: 'Pesquisar' }).click()

  const tableRows = await page.getByRole('cell', { name: "Entregue"}).all()

  expect(tableRows.length).toBe(10)
})