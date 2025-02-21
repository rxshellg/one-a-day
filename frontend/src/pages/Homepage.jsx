import NavBar from '../components/NavBar'
import JokeOfTheDayCard from '../components/JokeOfTheDayCard';
import NumberOfTheDayCard from '../components/NumberOfTheDayCard';
import TodayInHistoryCard from '../components/TodayInHistoryCard';
import WordOfTheDayCard from '../components/WordOfTheDayCard';

const Homepage = () => {
    return (
        <>
            <NavBar />
            <JokeOfTheDayCard />
            <NumberOfTheDayCard />
            <TodayInHistoryCard />
            <WordOfTheDayCard />
        </>
    )
}

export default Homepage;