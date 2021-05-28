const mealdbkeys = {
    "Search meal by name": "https://themealdb.p.rapidapi.com/search.php?s=Arrabiata",
    "Lookup full meal details by id": "https://themealdb.p.rapidapi.com/lookup.php?i=52772",
    "List all meal categories": "https://themealdb.p.rapidapi.com/list.php?c=list",
    "Filter by Category": "https://themealdb.p.rapidapi.com/filter.php?c=Seafood",
    keys: {
        "Search meal by name": "meals",
        "Lookup full meal details by id": "focusedmealdetails",
        "List all meal categories": "categories",
        "Filter by Category": "meals"
    },
    listfields: {
        meals: ["strMeal", "strMealThumb", "idMeal"],
        focusedmealdetails: ["idMeal", "strMeal", "strDrinkAlternate", "strCategory", "strArea", "strInstructions", "strYoutube"],
        categories: ["strCategory"],
    },
}

const Defaultstate = {
    meals: [],
    focusedmealdetails: {},
    categories: [],
}

const Detectitems = (item) => {
    debugger;
    let ans;
    const { listfields } = mealdbkeys

    Object.keys(listfields).forEach(e => {
        ans = Object.keys(item).every(ee => listfields[e].indexOf(ee) != -1) ? e : ans;
    })

    return ans;
}

function fetcher(url, call) {
    debugger;
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "352fae4cc4msh403045479e456c0p1c2ce7jsnc94ed5a5de5d",
            "x-rapidapi-host": "themealdb.p.rapidapi.com",
        },
    }

    let d = {
        fetch: (u) => {
            debugger;
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
        }

    }

    return d;
}

export { mealdbkeys, fetcher, Detectitems, Defaultstate }