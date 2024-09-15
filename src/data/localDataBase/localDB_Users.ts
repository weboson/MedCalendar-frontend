//* Локальная База Данных User 
//! User Data Base
//  В Серверном БД будут связи: User: recipes(рецепты) 
// type 
interface IUser {
    id: number
    name: string
    email: string
    password: string
    createdAt: string
    updatedAt: string 
}

interface IUsers extends Array<IUser>{}


const users: IUsers = [
    {
        id: 9,
        name: 'Rishat',
        email: 'user@gmail.com',
        password: '111111',
        createdAt: '10.12.2023',
        updatedAt: '14.12.2023',
    },
    {
        id: 10,
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '111111',
        createdAt: '10.12.2023',
        updatedAt: '14.12.2023',
    }
]


export default users;