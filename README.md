# Link Hexer

Проект выложен по адресу: https://vlad-lis.github.io/link-to-hex/

## Запуск проекта

Если нужно, для basic authentification создать .env по шаблону .env.template:

```
BASIC_AUTH_USERNAME =
BASIC_AUTH_PASSWORD =
```

### Локально:

1. Клонировать репозиторий:

```
git clone git@github.com:vlad-lis/link-to-hex.git
```

2. Установить зависимости из корней папки:

```
npm i
```

3. Запустить проект:

```
npm run start
```

### Локально через docker:

1. Клонировать репозиторий:

```
git clone git@github.com:vlad-lis/link-to-hex.git
```

2. В корневой папке запустить билд:

```
docker-compose up --build
```
