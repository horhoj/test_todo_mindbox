# тестовое задание для вашей компании

1. моковое апи с имитацией задержки ответа от сервера
2. тесты
3. проверка покрытия тестами

# Используется: 

vite, react, typescript, redux-tookit, docker(docker-compose), nginx (для раздачи статики билда), eslint + prettier

# запуск

npm i

npm run start

# тесты

npm run test

# покрытие тестами

npm run test-coverage

# запуск в докере (протестировано только на линукс, нужны make, docker, docker-compose)

запуск в режиме разработки (порт 3000)

make docker-ddev

запуск в режиме раздачи билда через nginx (порт 80)

make docker-init


разумеется порты можно поменять в настройках
