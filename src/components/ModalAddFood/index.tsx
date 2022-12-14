import { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi'

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

interface CreateFoodData {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<FoodProps, 'id' | 'available'>) => void;
}

export const ModalAddFood = ({ handleAddFood, isOpen, setIsOpen }: ModalProps) => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: CreateFoodData) => {
      const { name, image, price, description } = data;
      handleAddFood({ name, image, price, description });
      setIsOpen();
    },
    [handleAddFood, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}

