# Ciphering_CLI_Tool
NodeJS 2021 Q4 task

[задание](https://github.com/rolling-scopes-school/basic-nodejs-course/blob/master/descriptions/ciphering-cli-tool.md)

## для запуска необходимо:
1. скопировать все файлы к себе на компьютер
2. открыть консоль(должен быть установлен [Node.js](https://nodejs.org/en/))
3. Перейти в папку, куда были скопированы файлы
4. ввести команду `node ciphering` с необходимыми параметрами

## параметры команды `node ciphering`:
1. `-c` или `--config` - обязательный параметр, указывается список применяемых шифров. Имеет вид `{XY(-)}n`, где:
  * X - флаг, указывающй на тип шифрования:
    * C - Шифр Цезаяр
    * A - Шифр Атбаш
    * R - Шифр ROT-8 
  * Y - флаг указывает на шифрование или дешифрование. Используется только у шифров C и R, не должен присутствовать у шифра A. Возможные значения:
    * 1 - шифрование
    * 0 - дешифрование
 2. `-i` или `--input` - необязательный параметр, указывается имя или путь к файлу, из которого будет браться текст для шифрования. Если отсутствует, то текст надо будт вводить в консоль.
 3.  `-o` или `--output` - необязательный параметр, указывается имя или путь к файлу, в который будет записываться зашифрованный текст. Если файла не существует, то он будет создан. Если отсутствует параметр, то зашифрованный текст выведется в консоль.

## примеры
```
node ciphering -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
```
```
node ciphering -c "A" -o "./output.txt"
```
```
node ciphering -c "R0-A" -i "./input.txt"
```
```
node ciphering -c "C1-C1"
```
