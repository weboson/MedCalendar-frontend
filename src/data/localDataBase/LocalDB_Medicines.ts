// //* Локальная База Данных Medicines (лекарства) 
// //! Medicines Data Base
// //  В Серверном БД будут связи: Medicines:  dosage -> Course(сколько времени принмиать ЛС/ в годб месяц...) -> Packaging (сколько в упаковке ЛС и по сколько мг)


// interface IMedicine {
//     id: number 
//     name: string
//     description: string
//     comment?: string
//     ingredient: string
//     createdAt: string
//     updatedAt: string
// }

// interface IMedicines extends Array<IMedicine>{}

// const medicines: IMedicines = [
//     {
//         id: 2,
//         name: 'Урсосан',
//         description: 'Лекарство от желудка',
//         comment: 'Дорогое лекарство',
//         ingredient: 'Дикселант', // действующее вещество (необязательное)
//         createdAt: '10.12.23',
//         updatedAt: '11.12.23',
//     },
// ]

// export default medicines;