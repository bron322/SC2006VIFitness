import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ExerciseCard({img, title, description}) {
  return (
      <Card sx={{ width: 150, height: 200 }}>
        <CardActionArea>
          <CardMedia sx={{ maxWidth: 150, height: 120 }}
            component="img"
            image={img}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="div" className='text-center'>
              {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" className='text-center'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
  );
}

