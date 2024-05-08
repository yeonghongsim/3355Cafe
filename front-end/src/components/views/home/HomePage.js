import styled from "styled-components"
import Logo from "../../commons/logo/Logo";
import { COLORS } from "../../../commons/styles/COLORS";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const HeaderSection = styled.section`
    width: 100%;
    height: 12vh;
`;
const SmallWrapper = styled.div`
    width: 75%;
    height: 100%;
    margin: 0 auto;
`;
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderLogoContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;
const HeaderEmpty = styled.div`
    width: 70vw;
    height: 100%;
`;
const HeaderToggleContainer = styled.div`
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;
const BarImageWrapper = styled.div`
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0 , 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
    }
`;
const BarImage = styled.img`
    width: 50%;
    height: 50%;
`;
const NavbarSection = styled.section`
    width: 100%;
    height: 8vh;
    background-color: ${COLORS.primeColor};
`;
const NavbarContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.3rem;
`;
const Navbar = styled.nav`
    // width: 10rem;
    height: 100%;
    padding: 0 1rem 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const NavText = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    color: white;
    &:hover {
        cursor: pointer;
    }
`;
const NoticeSection = styled.section`
    width: 100%;
    height: 6vh;
`;
const NoticeContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-left: 1rem;
`;
const NoticeText = styled.p`
    font-size: 1.6rem;
    font-weight: normal;
    color: black;
`;
const BodySection = styled.section`
    width: 100%;
    height: 66vh;
`;
const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BodyContainerLeft = styled.div`
    width: 60%;
    height: 100%;
    background-color: lightgreen;
    padding: 1rem;
`;
const BodyContainerRight = styled.div`
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
const BodyContainerRightSmall = styled.div`
    width: 100%;
    height: 50%;
    background-color: ${props => props.bgColor};
    padding: 1rem;
`;
const FooterSection = styled.section`
    width: 100%;
    height: 8vh;
    background-color: darkgray;
`;
const FooterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;
const FooterCopyrightContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 1rem 0 1rem;
`;
const CopyrightImg = styled.img`
    width: 2.4rem;
    height: 2.4rem;
`;
const CopyrightText = styled.p`
    font-size: 2rem;
    font-weight: bold;
    color: black;
`;
const FooterTextContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0 1rem;
    gap: 1rem;
`;
const FooterText = styled.p`
    font-size: 1.6rem;
    font-weight: bold;
    color: black;
    &:hover {
        color: blue;
        cursor: pointer;
        text-decoration: underline;
    }
    ${props => props.afterText && `
    &::after {
        padding-left: 1rem;
        content: "|";
        font-size: 1.6rem;
    }
    `}
`;

export default function HomePage(props) {
    const imsiNoticeTextList = ['공지사항1', '공지사항2', '공지사항3'];

    return (
        <Wrapper>
            <HeaderSection>
                <SmallWrapper>
                    <HeaderContainer>
                        <HeaderLogoContainer>
                            <Logo></Logo>
                        </HeaderLogoContainer>
                        <HeaderEmpty></HeaderEmpty>
                        <HeaderToggleContainer>
                            <BarImageWrapper>
                                <BarImage src="/image/bars.svg"></BarImage>
                            </BarImageWrapper>
                        </HeaderToggleContainer>
                    </HeaderContainer>
                </SmallWrapper>
            </HeaderSection>
            <NavbarSection>
                <SmallWrapper>
                    <NavbarContainer>
                        <Navbar>
                            <NavText>
                                게시판
                            </NavText>
                        </Navbar>
                        <Navbar>
                            <NavText>
                                관리자모드
                            </NavText>
                        </Navbar>
                    </NavbarContainer>
                </SmallWrapper>
            </NavbarSection>
            <NoticeSection>
                <SmallWrapper>
                    <NoticeContainer>
                        {
                            imsiNoticeTextList.map((text) =>
                                <NoticeText>
                                    {text}
                                </NoticeText>
                            )
                        }
                        settimeout 사용해서 로테이션 해보기
                    </NoticeContainer>
                </SmallWrapper>
            </NoticeSection>
            <BodySection>
                <SmallWrapper>
                    <BodyContainer>
                        <BodyContainerLeft>
                            이미지 슬라이드
                        </BodyContainerLeft>
                        <BodyContainerRight>
                            <BodyContainerRightSmall bgColor="lightblue">
                                오늘의 핫이슈
                            </BodyContainerRightSmall>
                            <BodyContainerRightSmall bgColor="lightyellow">
                                이미지 파일들(ppt, video) 다운로드
                            </BodyContainerRightSmall>
                        </BodyContainerRight>
                    </BodyContainer>
                </SmallWrapper>
            </BodySection>
            <FooterSection>
                <SmallWrapper>
                    <FooterContainer>
                        <FooterCopyrightContainer>
                            <CopyrightImg src="/image/copyright.svg"></CopyrightImg>
                            <CopyrightText>Copyright</CopyrightText>
                        </FooterCopyrightContainer>
                        <FooterTextContainer>
                            <FooterText afterText={true}>ppt</FooterText>
                            <FooterText afterText={false}>video</FooterText>
                        </FooterTextContainer>
                    </FooterContainer>
                </SmallWrapper>
            </FooterSection>
        </Wrapper>
    )
}