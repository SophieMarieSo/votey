import styled from "@emotion/styled";
import React from "react";
import Text from "./Text";
import { colors } from "../modules/settings";

interface Props {
    rank: number,
    title: string;
    subTitle: string;
    vote: string;
}

const RoundListItem: React.FC<Props> = ({
    rank,
    title,
    subTitle,
    vote,
}) => {
    return (
        <Container>
                <RankContainer>
                    <Text fontSize={36} fontWeight="bold" color="voteyWhite">
                        {String(rank)}
                    </Text>
                </RankContainer>
                <ContentContainer>
                    <TitleContainer>
                        <Text fontSize={28} fontWeight="bold" color="voteyWhite">
                            {title}
                        </Text>                    
                    </TitleContainer>
                    <SubTitleContainer>
                        <Text fontSize={20} fontWeight="bold" color="voteyBlack50">
                            {subTitle}
                        </Text>
                    </SubTitleContainer>
                </ContentContainer>
                <VoteContainer>
                    <Text fontSize={20} fontWeight="bold" color="voteyBlack">
                        {vote}
                    </Text>
                </VoteContainer>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    background-color: ${colors.voteyGray};
    border-radius: 45px;
    display: flex;
    align-items: center;
    margin: 20px;
    padding: 0px 60px;
`;

const RankContainer = styled.div`
    flex: 1;
    display: flex;
`;

const ContentContainer = styled.div`
    flex: 9;
    display: flex;
    margin: 0px 40px 0px 0px;
    align-items: left;
`;

const TitleContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0px 20px 0px 0px;
`;

const SubTitleContainer = styled.div`
    justify-content: center;
    align-items: center;
    display: flex;
    margin: 0px 10px 0px 0px;
`;

const VoteContainer = styled.div`
    flex: 1;
    display: flex;
    width: 75px;
    height: 40px;
    background-color: ${colors.voteyBlack50};
    border-radius: 45px;
    justify-content: center;
    align-items: center;
    margin: 10px;
    padding: 0px 10px;
`; 

export default RoundListItem;
