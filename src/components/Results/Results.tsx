import { useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store';
import { quizSlice } from '../../store/slices';
import { ButtonRowFieldset } from '../LandingPage/LandingPage.styled';
import { default as S } from './Results.styled';

const Results: React.FC = () => {
    const dispatch = useDispatch();
    const score = useSelector((state: RootState) => state.quiz.score);
    const total = useSelector((state: RootState) => state.quiz.questions.length);

    const handleReturnToMain = () => {
        dispatch(returnToMainMenu());
    }

    const handlePlayAgain = () => {
        dispatch(playAgain());
    }

    return (
        <S.Wrapper>
            <S.Stack>
                <div>
                    <S.Announcement>You're all done</S.Announcement>
                </div>
                <div>
                    <span>You got <strong>{score}</strong> out of <strong>{total}</strong> right!</span>
                </div>
                <S.ButtonRowFieldset>
                    <S.Button onClick={handlePlayAgain}>Play Again</S.Button>
                    <S.Button onClick={handleReturnToMain}>Return to Main</S.Button>
                </S.ButtonRowFieldset>
            </S.Stack>
        </S.Wrapper>
    )
}

const { returnToMainMenu, playAgain } = quizSlice.actions;

export default Results;