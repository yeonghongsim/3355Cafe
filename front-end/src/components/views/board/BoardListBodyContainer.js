import styled from "styled-components"
import { COLORS } from "../../../commons/styles/COLORS";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../../commons/hooks/Spinner";
import UnLoginAlertModal from "../../commons/modal/UnLoginAlertModal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const RegisterBoardWithSearchBarSection = styled.section`
    width: 100%;
    height: 8vh;
    // background-color: #eee;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    justify-content: ${(props) => (props.$userInfo === null ?
        'flex-end' : 'space-between'
    )};
    // padding-right: 1rem;
    // box-sizing: border-box;
`;
const RegisterBoardBtnContainer = styled.div`
    width: 10rem;
    height: 4rem;
    background-color: #eee;
    border-radius: 0.5rem;
`;
const RegisterBoardBtn = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: ${COLORS.greenColor};
    &:hover {
        cursor: pointer;
    }
`;
const RegisterBoardBtnText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
`;
const SearchBarContainer = styled.div`
    width: 30rem;
    height: 4rem;
    gap: 0.5rem;
    // background-color: #eee;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const SearchBarInputWrapper = styled.div`
    width: calc(100% - 5rem);
    height: 4rem;
    border: 0.1rem solid darkgray;
    border-radius: 0.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const SearchBarInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 1rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: black;
    box-sizing: border-box;
    &:input:focus {
        border: none;
        outline: none;
    }
`;
const SearchBarImgWrapper = styled.div`
    width: 4.5rem;
    height: 4rem;
    background-color: ${COLORS.blueColor};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;
const SearchBarImg = styled.img`
    width: 70%;
    height: 70%;
    flex-shrink: 0;
`;
const BoardListSection = styled.section`
    width: 100%;
    height: calc(100% - 8vh);
`;
const BoardListContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.1rem;
`;
const EmptyBoardContainer = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const BoardPageLayer = styled.div`
    width: 100%;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Text = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
    margin: 0;
`;
const BoardContainer = styled.div`
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-top: 1px solid #d9d9d9;
    border-bottom: 1px solid #d9d9d9;
    box-sizing: border-box;
`;
const BoardTypeWrapper = styled.div`
    width: 8%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #eee;
    font-size: 1.4rem;
`;
const BoardWriterWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
    font-size: 1.4rem;
`;
const BoardTitleWrapper = styled.div`
    width: 42%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // background-color: #eee;
    font-size: 1.4rem;
    padding-left: 1rem;
    box-sizing: border-box;
`;
const BoardViewsWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
    font-size: 1.4rem;
`;
const BoardEmotionWrapper = styled.div`
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #eee;
    font-size: 1.4rem;
`;
const ThumsImg = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    padding-right: 1rem;
    flex-shirnk: 0;
`;
const BoardEmotionText = styled.p`
    font-size: 1.4rem;
    margin: 0;
    ${(props) =>
        props.$afterText && `
        &::after {
            content: '/';
            margin-left: 2.5rem;
            margin-right: 2.5rem;
        }
        `
    }
`;
const BoardDateWrapper = styled.div`
    width: 10%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: #d9d9d9;
    font-size: 1.4rem;
`;

export default function BoardListBodyContainer({
    $location
}) {
    // page navigate
    const navigate = useNavigate();
    const location = useLocation();
    // 목록 조회 전까지의 로딩
    const [isLoading, setIsLoading] = useState(true);
    // 알람 모달 state
    let [isOnAlertModal, setIsOnAlertModal] = useState(false);
    const handleCloseAlertModal = () => {
        setIsOnAlertModal(false);
    };
    // get userinfo in store
    const userInfo = useSelector((state) => state.user.user);
    // board list from fetch get
    let [boardList, setBoardList] = useState([]);
    // search input ref
    const searchInputRef = useRef(null);
    // fetching board list
    useEffect(() => {
        if ($location.split('/').length === 2) {
            // console.log('board page');
            searchInputRef.current.value = '';
            setIsLoading(true);
            const fetchItems = async () => {
                try {
                    const fullURL = `http://localhost:8080/boardList`;
                    const response = await axios.get(fullURL);
                    const result = await response.data;
                    setBoardList(result);
                    setIsLoading(false);
                    // console.log(result);
                } catch (error) {
                    // console.error('Error getting itemType data:', error);
                    throw error;
                }
            };
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        } else if ($location.split('/')[2] !== 'search') {
            // console.log('board/more page');
            searchInputRef.current.value = '';
            setIsLoading(true);
            const moreURL = $location.split('/')[2];
            // console.log(moreURL);
            const fetchItems = async () => {
                try {
                    const fullURL = `http://localhost:8080/boardList/${moreURL}`;
                    const response = await axios.get(fullURL);
                    const result = await response.data;
                    setBoardList(result);
                    setIsLoading(false);
                } catch (error) {
                    // console.error('Error getting itemType data:', error);
                    throw error;
                }
            };
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        } else {
            setIsLoading(true);
            // console.log('board/search page');
            const searchData = location?.state.searchData;
            searchInputRef.current.value = searchData;
            let fetchItems;
            if (searchData === '') {
                console.log('value none');
                fetchItems = async () => {
                    try {
                        const fullURL = `http://localhost:8080/boardList`;
                        const response = await axios.get(fullURL);
                        const result = await response.data;
                        setBoardList(result);
                        setIsLoading(false);
                        // console.log(result);
                    } catch (error) {
                        // console.error('Error getting itemType data:', error);
                        throw error;
                    }
                };
            } else {
                // console.log('value ok');
                fetchItems = async () => {
                    try {
                        const fullURL = `http://localhost:8080/boardList/search/${searchData}`;
                        const response = await axios.get(fullURL);
                        const result = await response.data;
                        setBoardList(result);
                        setIsLoading(false);
                    } catch (error) {
                        // console.error('Error getting itemType data:', error);
                        throw error;
                    }
                };
            }
            // fetchUserItems를 의존성 배열에 추가
            fetchItems();
        }
    }, [
        $location,
        location
    ]);
    // click btn, move to register board
    const handleClickResisterBoardBtn = () => {
        navigate('/register/board');
    };
    // search input ref get value
    const handleSearchImgClick = async () => {
        const searchData = searchInputRef.current.value;
        navigate(`/board/search`, { state: { searchData: searchData } });
    };
    // click board
    const handleClickBoard = (board) => {
        if (userInfo === null) {
            setIsOnAlertModal(true);
        } else {
            moveToBoardDetailPage(board);
        }
    };
    const moveToBoardDetailPage = async (board) => {
        const prevPathname = location.pathname;
        const searchData = searchInputRef.current.value;
        navigate(`/boardDetail/${board._id}`, { state: { board, prevPathname, searchData } });
    };

    return (
        <Wrapper>
            <RegisterBoardWithSearchBarSection $userInfo={userInfo}>
                {
                    userInfo !== null ?
                        <RegisterBoardBtnContainer>
                            <RegisterBoardBtn
                                onClick={handleClickResisterBoardBtn}>
                                <RegisterBoardBtnText>글쓰기</RegisterBoardBtnText>
                            </RegisterBoardBtn>
                        </RegisterBoardBtnContainer> : null
                }
                <SearchBarContainer>
                    <SearchBarInputWrapper>
                        <SearchBarInput
                            ref={searchInputRef}
                            placeholder="검색어를 입력해주세요."
                        ></SearchBarInput>
                    </SearchBarInputWrapper>
                    <SearchBarImgWrapper
                        onClick={() => handleSearchImgClick()}
                    >
                        <SearchBarImg src="/image/search.svg"></SearchBarImg>
                    </SearchBarImgWrapper>
                </SearchBarContainer>
            </RegisterBoardWithSearchBarSection>
            <BoardListSection>
                {
                    isLoading ?
                        <Spinner></Spinner> :
                        <BoardListContainer>
                            {
                                boardList.length === 0 ?
                                    <EmptyBoardContainer>
                                        <Text>게시글이 없습니다.</Text>
                                    </EmptyBoardContainer>
                                    :
                                    boardList?.map((board, idx) => (
                                        <BoardContainer
                                            key={idx}
                                            $boardIndex={idx + 1}
                                            onClick={() => handleClickBoard(board)}>
                                            <BoardTypeWrapper>[ {board.boardTypeName} ]</BoardTypeWrapper>
                                            <BoardWriterWrapper>{board.userId}</BoardWriterWrapper>
                                            <BoardTitleWrapper>{board.boardTitle}</BoardTitleWrapper>
                                            <BoardEmotionWrapper>
                                                {
                                                    board.likeList.includes(userInfo?._id) ?
                                                        <ThumsImg src="/image/onThumbs-up.svg"></ThumsImg>
                                                        : <ThumsImg src="/image/offThumbs-up.svg"></ThumsImg>
                                                }
                                                <BoardEmotionText $afterText={true}>{board.likeList.length}</BoardEmotionText>
                                                {
                                                    board.unLikeList.includes(userInfo?._id) ?
                                                        <ThumsImg src="/image/onThumbs-down.svg"></ThumsImg>
                                                        : <ThumsImg src="/image/offThumbs-down.svg"></ThumsImg>
                                                }
                                                <BoardEmotionText $afterText={false}>{board.unLikeList.length}</BoardEmotionText>
                                            </BoardEmotionWrapper>
                                            <BoardDateWrapper>{board.date.slice(0, 10)}</BoardDateWrapper>
                                            <BoardViewsWrapper>조회수 : {board.views.length}</BoardViewsWrapper>
                                        </BoardContainer>

                                    ))
                            }
                            {
                                boardList.length !== 0 ?
                                    < BoardPageLayer >
                                        <Text>page number</Text>
                                    </BoardPageLayer> : null
                            }
                        </BoardListContainer>
                }
            </BoardListSection>
            <UnLoginAlertModal
                isOn={isOnAlertModal}
                handleCloseModal={handleCloseAlertModal}
            ></UnLoginAlertModal>
        </Wrapper >
    )
}