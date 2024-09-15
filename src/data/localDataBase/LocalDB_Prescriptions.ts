// //* Локальная База Данных Prescriptions (рецепты) 
// //! Prescriptions Data Base
// //  В Серверном БД будут связи: Recipes:  
// // Medicines (лекарства) -> 
// // Methods (способы приёма) -> 
// // dosage - > 
// // Course(сколько времени принмиать ЛС) ->  
// // *doctor - > 
// // Clinic* -> 
// // Clinic_adress*


// interface IPrescription {
//     id: number
//     title: string
//     description: string
//     comment?: string
//     createdAt: string
//     updatedAt: string
// }

// interface IPrescriptions extends Array<IPrescription>{}

// const prescriptions: IPrescriptions = [
//     {
//         id: 1,
//         title: "Рецепт для живота",
//         description: "Витамины для живота",
//         comment: "Не обязательное поле",
//         createdAt: '10.12.23',
//         updatedAt: '11.12.23',

//     },
//     {
//         id: 2,
//         title: "Рецепт для зрения",
//         description: "Витамины для зрения",
//         comment: "Не обязательное поле",
//         createdAt: '9.12.23',
//         updatedAt: '10.12.23',

//     },
// ]


// export default prescriptions;