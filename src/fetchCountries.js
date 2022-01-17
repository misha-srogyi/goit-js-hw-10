export function fetchCountries(name) {
    const params = 'name,capital,population,flags,languages';
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.message);
            }
            return response.json();
        }
    )
}

// Используй публичный API Rest Countries, а именно ресурс name, возвращающий массив объектов стран удовлетворивших критерий поиска. Добавь минимальное оформление элементов интерфейса.

// Напиши функцию fetchCountries(name) которая делает HTTP-запрос на ресурс name и возвращает промис с массивом стран - результатом запроса. Вынеси её в отдельный файл fetchCountries.js и сделай именованный экспорт.