# Quasar App

### Демо
#### Веб
https://github.com/user-attachments/assets/7839ac79-a804-4691-9019-8d4b28e63680

#### Мобильное
https://github.com/user-attachments/assets/e2c16630-64cb-4111-b33e-0eeb2d8eeb9f

### Разворот проекта

1. `npm install`
2. `quasar dev`

### Какие файлы смотреть

`stores/tree.ts` - логика работы с деревом (добавление, удаление, редактирование)  
`pages/IndexPage.vue` - отображение компонентов, подключение `stores/store.ts` и сохранение в localstorage  
`components/TreeNode.vue` - компонент для отображения ноды  
`components/RemoveNodeModal.vue` - модальное окно для подтверждения удаления  
`components/EditNodeModal.vue` - модальное окно для редактирования названия ноды  

### APK
[https://github.com/cherdev/quasar_tree/blob/main/app.apk](https://github.com/cherdev/quasar_tree/blob/main/app.apk)

### Что бы улучшил

1. Для производительности использовал бы отдельную структуру данных и потом создавал бы массив для передачи в `q-tree`. Тут зависит от того что для нас важнее - добавление и редактирование нод или возможность взять любую часть нашего дерева или еще что-то и под это подбирал бы. Как вариант, можно было бы взять `Map`, где ключ - путь до ноды (типа как `materialized path`), а значение сама нода. Таким образом у нас был бы O(1) для изменения ноды, потому что мы бы просто доставали ее по ключу и добавление новых нод тоже было бы O(1) и мы могли бы собирать массив для `q-tree` просто пройдясь по нашему объекту, что будет O(n). Ну это как вариант. Просто рекурсивный проход по дереву для чего-то простого можно оставить и так, но для большого количества узлов он будет слишком долгим.
2. Для производительности добавил бы `debounce` для сохранения в локалсторедж - если пользователь решит 100 раз подряд нажать на добавление ноды.
3. Для надежности добавил бы валидатор JSON при доставании дерева из localStorage, типа [zod](https://github.com/colinhacks/zod) или [ajv](https://github.com/ajv-validator/ajv).
4. Для юзабилити можно лоадер добавить пока грузиться дерево из localstorage/api
5. Для удобства разработки можно модалки не компонентами на страницу прокидывать, а через плагин включать
6. ...
