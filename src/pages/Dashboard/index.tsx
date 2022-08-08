import { useEffect, useState } from 'react'

import Food from '../../components/Food'
import Header from '../../components/Header'
import ModalAddFood from '../../components/ModalAddFood'
import ModalEditFood from '../../components/ModalEditFood'
import api from '../../services/api'

import { FoodsContainer } from './styles'

interface FoodProps {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

export const Dashboard = () => {
  const [foods, setFoods] = useState<FoodProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps)
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  useEffect(() => {
    const getFoods = async (): Promise<void> => {
      const response = await api.get('/foods')
      setFoods(response.data)
    }
    getFoods()
  }, [])

  const handleAddFood = async (
    food: Omit<FoodProps, 'id' | 'available'>,
  ): Promise<void> => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(food => [...food, response.data])
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (
    food: Omit<FoodProps, 'id' | 'available'>,
  ): Promise<void> => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      setFoods(state => {
        return state.map(food => {
          if (food.id === editingFood.id) {
            return { ...foodUpdated.data }
          }
          return food
        })
      })
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number): Promise<void> => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = (): void => {
    setModalOpen(!modalOpen)
  }

  const toggleEditModal = (): void => {
    setEditModalOpen(!editModalOpen)
  }

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food)
    setEditModalOpen(true)
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  )
}
