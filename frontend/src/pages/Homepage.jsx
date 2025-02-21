import NavBar from '../components/NavBar'
import JokeOfTheDayCard from '../components/JokeOfTheDayCard';
import NumberOfTheDayCard from '../components/NumberOfTheDayCard';

const Homepage = () => {
    return (
        <>
            <NavBar />
            <JokeOfTheDayCard />
            <NumberOfTheDayCard />
        </>
    )
}

export default Homepage;