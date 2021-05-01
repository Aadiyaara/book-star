import React from 'react'
import { Segment } from 'semantic-ui-react'
import {LandingCategories} from '../../../../config/Constants'
import BookLandingList from './BookLandingList'

export default function BookLanding() {

    return (
        <Segment>
            {
                LandingCategories.map((landingListCategory, index) => {
                    return <BookLandingList key={index} filter={landingListCategory} />
                })
            }
        </Segment>
    )
}
