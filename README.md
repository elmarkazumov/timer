## Что это?
В раздумьях чем бы заняться, пришла идея создать простенький таймер. Пока открывал vs code, подумал, а почему еще не добавить время и обратный отсчет.

Время отображается за счет метода `toLocaleDateString()`. Ему можно передать параметр в виде объекта, задающий формат выходных значений. Также есть возможность просмотреть время в другом городе, вводом в поле на странице "Время" название города.

Таймер и обратный отсчет работают с помощью `setTimeout()`

