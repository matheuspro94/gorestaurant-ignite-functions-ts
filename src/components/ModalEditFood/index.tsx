import React, { useCallback, useRef } from 'react'
import { FiCheckSquare } from 'react-icons/fi'
import { FormHandles } from '@unform/core';

import { Input } from '../Input'
import { Modal } from '../Modal'
import { Form } from './styles'

interface FoodProps {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  available: boolean;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdateFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
  editingFood: FoodProps;
}

interface EditFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

export const ModalEditFood = ({ editingFood, handleUpdateFood, isOpen, setIsOpen }: ModalProps) => {

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditFoodData) => {
      handleUpdateFood(data);
      setIsOpen();
    },
    [handleUpdateFood, setIsOpen],
  );
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

