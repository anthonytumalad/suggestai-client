<script setup lang="ts">
import AppTable, { type Column } from '@/components/ui/table/AppTable.vue'

interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
}

const columns: Column<Product>[] = [
  { key: 'name', label: 'Product Name' },
  { key: 'price', label: 'Price', align: 'right' },
  { key: 'stock', label: 'Stock', align: 'center' },
  { key: 'category', label: 'Category' },
]

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, stock: 15, category: 'Electronics' },
  { id: 2, name: 'Headphones', price: 200, stock: 50, category: 'Electronics' },
  { id: 3, name: 'Coffee Mug', price: 15, stock: 100, category: 'Home' },
  { id: 4, name: 'Notebook', price: 5, stock: 200, category: 'Stationery' },
  { id: 5, name: 'Chair', price: 85, stock: 25, category: 'Furniture' },
]
</script>

<template>
  <AppTable :columns="columns" :rows="products" row-key="id" selectable />
</template>
