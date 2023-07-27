import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface Props {
  onClick(): void;
  backgroundImageSource: string;
  title: string;
  subTitle: string;
}

const SquareCard: React.FC<Props> = ({
  onClick,
  backgroundImageSource,
  title,
  subTitle,
}) => {
  return (
    <Card style={{ minWidth: 400 }} onClick={onClick}>
      <CardActionArea>
        <CardMedia
          style={{
            width: 400,
            height: 300,
          }}
          component="img"
          image={
            !(backgroundImageSource === "")
              ? backgroundImageSource
              : "https://media.istockphoto.com/vectors/hand-puts-vote-bulletin-into-vote-box-election-concept-vector-id1063184564?k=20&m=1063184564&s=612x612&w=0&h=MLpSRZi-xbh-myoEAPJIHzhLL6SbBc1fSvPftgz1W94="
          }
          alt="캡스톤 디자인 최종투표"
        />
        <CardContent className="iloveyou">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="secondary">
            {subTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SquareCard;
