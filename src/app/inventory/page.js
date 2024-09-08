'use client'

import Breadcrumb from '@/components/home/breadcrum'
import { supabase } from '@/utils/supabase'
import { useState, useEffect } from 'react'

export default function InventoryPage() {
  const [inventory, setInventory] = useState([])
  const [newItem, setNewItem] = useState({ item_name: '', category: '', quantity: 0, reorder_level: 0 })
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    const { data, error } = await supabase.from('inventory').select('*')
    if (error) console.error('Error fetching inventory:', error)
    else setInventory(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editingItem) {
      const { data, error } = await supabase
        .from('inventory')
        .update(newItem)
        .eq('id', editingItem.id)
      if (error) console.error('Error updating item:', error)
      else {
        setEditingItem(null)
        fetchInventory()
      }
    } else {
      const { data, error } = await supabase.from('inventory').insert([newItem])
      if (error) console.error('Error adding item:', error)
      else fetchInventory()
    }
    setNewItem({ item_name: '', category: '', quantity: 0, reorder_level: 0 })
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setNewItem(item)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('inventory').delete().eq('id', id)
    if (error) console.error('Error deleting item:', error)
    else fetchInventory()
  }

  return (
    <div>
      <Breadcrumb title="Inventory" />
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">Manage Inventory</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="item_name" className="block text-gray-700 font-medium mb-1">Item Name</label>
                  <input
                    id="item_name"
                    type="text"
                    placeholder="Item Name"
                    value={newItem.item_name}
                    onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
                  <input
                    id="category"
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="quantity" className="block text-gray-700 font-medium mb-1">Quantity</label>
                  <input
                    id="quantity"
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="reorder_level" className="block text-gray-700 font-medium mb-1">Reorder Level</label>
                  <input
                    id="reorder_level"
                    type="number"
                    placeholder="Reorder Level"
                    value={newItem.reorder_level}
                    onChange={(e) => setNewItem({ ...newItem, reorder_level: parseInt(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
              >
                {editingItem ? 'Update' : 'Add'} Item
              </button>
            </form>
          </div>

          {/* List Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Inventory List</h2>
            <ul className="space-y-4">
              {inventory.map(item => (
                <li key={item.id} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium text-blue-600">{item.item_name}</p>
                    <p className="text-gray-600">Category: {item.category}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-gray-600">Reorder Level: {item.reorder_level}</p>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}