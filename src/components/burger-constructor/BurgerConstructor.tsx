import React from 'react';
import { Button, CurrencyIcon, DragIcon, DeleteIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Ingredient } from '../../utils/data';
import styles from './BurgerConstructor.module.css';

interface BurgerConstructorProps {
  ingredients: Ingredient[];
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({ ingredients }) => {
  const bunIngredients = ingredients.filter(i => i.type === 'bun');
  const mainIngredients = ingredients.filter(i => i.type === 'main');
  const sauceIngredients = ingredients.filter(i => i.type === 'sauce');

  const total = [
    ...bunIngredients,
    ...sauceIngredients,
    ...mainIngredients
  ].reduce((sum, item) => sum + (item?.price || 0), 0);

const dragFixStartNotShowIds = ['60666c42cc7b410027a1a9b12']
const dragFixEndNotShowIds = ['60666c42cc7b410027a1a9b140']
  return (
    <section className={styles.section}>
      {ingredients.filter(i => dragFixStartNotShowIds.includes(i._id)).map((item) => (
              <div key={item._id} className={styles.draggableItemTop}>
                  <div className={styles.draggableBlock}>
                  </div>
                  <ConstructorElement 
                    text={item.name + ' (верх)'} 
                    price={item.price} 
                    thumbnail={item.image} isLocked={true}/>
              </div>
            ))}
            
          <div className={styles.constructorList}>
            {bunIngredients.filter(i => !dragFixStartNotShowIds.includes(i._id)).map((item) => (
              <div key={item._id} className={styles.draggableItem}>
                  <div className={styles.draggableBlock}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement 
                    text={item.name} 
                    price={item.price} 
                    thumbnail={item.image} isLocked={false} />
              </div>
            ))}

            {sauceIngredients.filter(i => !dragFixStartNotShowIds.includes(i._id)).map((item) => (
              <div key={item._id} className={styles.draggableItem}>
                <div className={styles.draggableBlock}>
                  <DragIcon type="primary" />
                </div>
                <ConstructorElement 
                    text={item.name} 
                    price={item.price} 
                    thumbnail={item.image} isLocked={false} />
              </div>
            ))}
      </div>

      {bunIngredients.filter(i => dragFixEndNotShowIds.includes(i._id)).map((item) => (
        <div key={item._id} className={styles.draggableItemBottom}>
          <div className={styles.draggableBlock}>
          </div>
          <ConstructorElement 
              text={item.name + ' (низ)'} 
              price={item.price} 
              thumbnail={item.image} isLocked={true} />
        </div>
      ))}

      <div className={styles.footer}>
        <div className={styles.totalPrice}>
          <span>{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;