import { expect } from "@playwright/test"

export const ratingData = [
    {
        input: 1,
        expect: 'terrible'
    },
    {
        input: 2,
        expect: 'bad'
    },
    {
        input: 3,
        expect: 'normal'
    },
    {
        input: 4,
        expect: 'good'
    },
    {
        input: 5,
        expect: 'wonderful'
    }
]

export const haftRatingData = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]