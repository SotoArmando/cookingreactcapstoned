const mealdbkeys = {
    "Search meal by name": "https://themealdb.p.rapidapi.com/search.php?s=",
    "Lookup full meal details by id": "https://themealdb.p.rapidapi.com/lookup.php?i=",
    "List all meal categories": "https://themealdb.p.rapidapi.com/list.php?c=list",
    "Filter by Category": "https://themealdb.p.rapidapi.com/filter.php?c=",
    "Filter by Latest": "https://themealdb.p.rapidapi.com/latest.php",
    "unknownuser CRUD": "http://localhost:3000/unknownusers",
    "user CRUD": "http://localhost:3000/users",
    userExist: ({ mail, password }) => `?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%201%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22order%22%3A%20%22string%22%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22mail%22%3A%20%22${mail}%22%2C%0A%20%20%20%20%22password%22%3A%20%22${password}%22%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22mail%22%3A%20true%2C%0A%20%20%20%20%22nick%22%3A%20true%2C%0A%20%20%20%20%22password%22%3A%20true%0A%20%20%7D%0A%7D`,
    keys: {
        "Search meal by name": "meals",
        "Lookup full meal details by id": "focusedmealdetails",
        "List all meal categories": "categories",
        "Filter by Category": "meals",
        "Filter by Latest": "mealslatest",
    },
    listfields: {
        categories: ["strCategory"],
        meals: ["strMeal", "strMealThumb", "idMeal"],
        focusedmealdetails: ["idMeal", "strMeal", "strDrinkAlternate", "strCategory", "strArea", "strInstructions", "strYoutube"],
    },
}

const Defaultstate = {
    meals: [],
    focusedmealdetails: {},
    categories: [],
    mealslatest: [],
    session: {
        active: false,
        activesession: {}
    },
}

const Detectitems = (item) => {

    let ans;
    const { listfields } = mealdbkeys

    Object.keys(listfields).forEach(e => {
        ans = listfields[e].every(ee => item.hasOwnProperty(ee)) ? e : ans;
    })

    return ans;
}

function fetcher(url, call) {
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "352fae4cc4msh403045479e456c0p1c2ce7jsnc94ed5a5de5d",
            "x-rapidapi-host": "themealdb.p.rapidapi.com",

        },
    }

    let d = {
        fetch: (u) => {
            fetch(u || url, options)
                .then((res) => res.json())
                .then(call,
                    (error) => {
                        console.log(error)
                    }
                );
        },
        fetchAll: () => {
            let cond_0 = url.hasOwnProperty(0)
            if (cond_0) {
                url.forEach(u =>
                    d.fetch(u)
                )
            }
        },
        fetchandwaitAll: () => {
            let cond_0 = url.hasOwnProperty(0)
            if (cond_0) {
                Promise.all(url.map(e => fetch(e, options).then(resp => resp.json()).then(({ meals: items }) => (
                    { [Detectitems(items[0])]: items }
                )))).then(call)
            }
        },
        fetchcrudOperation: (operation = 'GET', body) => {
            let fetchurl = url + ((operation === 'GET') ? body : '')
            debugger;
            fetch(fetchurl, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: operation,
                body: operation === 'GET' ? undefined : JSON.stringify(body)
            }).then(resp => resp.json()).then(call)
        }
    }

    return d;
}

export { mealdbkeys, fetcher, Detectitems, Defaultstate }