# **Backend Test**
## **Question**
### 1. Please write a microservice to search movies. The microservice should be able to serve REST HTTP API using JSON.

| Data | Source |
| ------ | ------ |
| **Access Key** | faf7e5bb&s |
| **URL** | [omdbapi.com] |

**Example url call for the omdbapi:**
http://www.omdbapi.com/?apikey=faf7e5bb&s=Batman&page=2 

**Acceptance Criteria:**
- API to search Movie with pagination and keyword of movie name.
- API to get details of a movie.
- Log each incoming request to a database. You can use MySQL DB for this table.

**Important Aspects:**
- Code Readability. 
- Implement SOLID Principles. 
- Write Unit Test on Use Case / Service level. 
- Good usage of Go Routine. 

**Plus points:**
- Complete Unit Test on all codes. 
- Implementation of Clean Architecture. 

### 2. Create Query to get 3 biggest sales for each seller from tables below: 

**Seller**
| ID | name | email |
| ------ | ------ | ------ |
| 1 | Agus | agus@gmail.com |
| 2 | Surya | surya@gmail.com |
| 3 | Susi | susi@gmail.com |

**Product**
| ID | name | stok |
| ------ | ------ | ------ |
| 1 | Sabun | 10 |
| 2 | Shampoo | 22 |
| 3 | Pasta Gigi | 20 |

**Product_Sales**
| ID | ProductID | SellerID |
| ------ | ------ | ------ |
| 1 | 1 | 1 |
| 2 | 1 | 1 |
| 3 | 2 | 3 |
| 3 | 3 | 2 |
| 3 | 1 | 1 |

### 3. Reverse an Integer 
**Case 1**
| Input | Output |
| ------ | ------ |
| 152 | 251 |

**Case 2**
| Input | Output |
| ------ | ------ |
| -152 | -251 |

**Case 3**
| Input | Output |
| ------ | ------ |
| 290 | 92 |

### 4. Anagram

> Anagram adalah istilah dimana suatu string jika dibolak balik ordernya maka akan sama eg. 'aku' dan 'kua' adalah Anagram, 'aku' dan 'aka' bukan Anagram. 

Dibawah ini ada array berisi sederetan Strings. ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'] Silahkan kelompokkan/group kata-kata di dalamnya sesuai dengan kelompok Anagramnya.

**Expected Outputs**
["kita", "atik", "tika"]
["aku", "kua"] 
["makan"] 
["kia"]

## **Answer**
**1.Uploaded in :**
- repository : **[Github]**
- documentation api : **[Postman]**

**Installation Guides**
- Clone my repo [interview_cuanz_2]
- install all dependencies using npm or yarn `npm install`
- create db and run migration `npm run db:start` for testing you run `npm run db:test:start`
- optional if you want using dummy data, run seeding `npm sequelize-cli db:seed:all`
- i provide .env to set port and node env. Run `cp .env.example .env` to using .env
- for running the application run `npm run start`
- you can running application using postman. Check my [documentation api](https://documenter.getpostman.com/view/18078111/UyxdMACs) for details.
- i make integration test for test enviroment, run `npm run test test/`

**2.Query to get 3 biggest sales:**
```sh
SELECT seller.*, COUNT(product_sales.SellerID) AS total_sell FROM product_sales LEFT JOIN seller ON seller.ID = product_sales.SellerID GROUP BY seller.name ORDER BY (total_sell) DESC LIMIT 3
```
**Result :**
| ID | name | email | total_sell |
| ------ | ------ | ------ | ------ |
| 1 | Agus | agus@gmail.com | 3 |
| 3 | Susi | susi@gmail.com | 1 |
| 2 | Surya | surya@gmail.com | 1 |

**3.Reverse**
app.js
```sh
const reversedNum = num => parseFloat(num.toString().split('').reverse().join('')) * Math.sign(num)

function reverseNum(num) {
	return (
    parseFloat(
      num
        .toString()
        .split('')
        .reverse()
        .join('')
    ) * Math.sign(num)
  )
}
```

case 1
```sh
console.log(reverseNum(152))
// result : 251
```
case 2
```sh
console.log(reverseNum(-152))
// result : -251
```
case 2
```sh
console.log(reverseNum(290))
// result : 92
```

**4. Grouping anagrams**

app.js
```sh
const groupingAnagrams = (strs) => {
    let hash = {}

    strs.forEach(str => {
        let letters = str.split('').sort()
        hash[letters] ? hash[letters].push(str) : hash[letters] = [str]
    })

    const keys = Object.keys(hash);
    const values = keys.map(function(v) { return hash[v]; });
    return values
};
```
call function
```sh
let arr = ["kita", "atik", "tika", "aku", "kia", "makan", "kua"]
console.log(groupingAnagrams(arr))
```

and result :
```sh
[
    ['kita', 'atik', 'tika'],
    ['aku', 'kua'],
    ['kia'],
    ['makan']
]
```

[omdbapi.com]: <http://www.omdbapi.com/>
[Github]: <http://github.com/>
[Postman]: <https://documenter.getpostman.com/view/18078111/UyxdMACs>
