import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        color: 'rgba(0,183,255, 1)',
      },
      image: {
        marginLeft: '15px',
      },
      [theme.breakpoints.down('sm')]: { //https://youtube.com/clip/UgkxR2wTCLi6cxFi0HRhmhcHru-HvxL_-mZX
        mainContainer: {
          flexDirection: "column-reverse"
        }

      }
}));