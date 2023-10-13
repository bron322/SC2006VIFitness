import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function MuscleCard({img, title, description}) {
  return (
    <Card sx={{ width: 200, height: 430 }}>
      <CardActionArea>
        <CardMedia sx={{ maxWidth: 350, height: 350 }}
          component="img"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div" className='text-center'>
            {title}
          </Typography>
          <Typography variant="h5" color="text.secondary" className='text-center'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}