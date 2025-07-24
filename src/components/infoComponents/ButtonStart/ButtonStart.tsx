import { useNavigate } from 'react-router-dom';
import './ButtonStart.css';
import { useEnrollRoadMapMutation } from '@/app/services/userOperations';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import toast from 'react-hot-toast';
import Spinner from '@/Ui/LoadingSpinner';
import { addEnrolledTrack } from '@/app/features/enrolledTracksSlice';
import { clickedIdAction } from '@/app/features/clickedIdSlice';


interface Iprops{
    typeofenroll:string
}

const ButtonStart = ({typeofenroll}:Iprops) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  // user id
    const userDataString = localStorage.getItem("loggedInUser");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const IdUser = userData.id;

    const { ClickedId } = useSelector((state: RootState) => state.clickedId);
    const enrolledTracks = useSelector(
    (state: RootState) => state.enrolledTracks[IdUser] || []
    );

    const [enroll, { isLoading }] = useEnrollRoadMapMutation();

const isAlreadyEnrolled = enrolledTracks.includes(ClickedId??"");

    const handleEnroll = () => {
    if (!ClickedId || !IdUser) return;

    if (isAlreadyEnrolled) {
    dispatch(clickedIdAction(ClickedId));
    navigate('RoadMapOfFrontend');
    return;
    }

    enroll(ClickedId)
    .unwrap()
    .then(() => {
    dispatch(addEnrolledTrack({ userId: IdUser, trackId: ClickedId }));

        toast.success('You enrolled the track successfully!', {
        position: 'bottom-center',
        duration: 4000,
        style: {
            backgroundColor: 'black',
            color: 'white',
        },
        });

        dispatch(clickedIdAction(ClickedId));
        navigate('RoadMapOfFrontend');
    })
    .catch((error) => {
        toast.error('Failed to enroll. Try again later.');
        console.error(error);
    });
};


    return (
    <div className="buttons-startInfo">
        <button
        className="btn-startInfo flex items-center gap-2 px-4 py-2"
        onClick={handleEnroll}
        disabled={isLoading}
>
        {isLoading && <Spinner />}
        <span></span>
    <p
    data-start="good luck!"
    data-text="start"
    data-title={
        isLoading
        ? 'Loading...'
        : isAlreadyEnrolled
        ? 'Enrolled'
        : typeofenroll
    }
    ></p>
</button>

    </div>
    );
};

export default ButtonStart;
