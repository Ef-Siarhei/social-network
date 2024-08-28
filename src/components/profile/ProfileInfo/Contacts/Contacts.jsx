import facebook from '../../../../assets/images/icons_contacts/facebook.svg';
import website from '../../../../assets/images/icons_contacts/website.svg';
import vk from '../../../../assets/images/icons_contacts/vk.svg';
import twitter from '../../../../assets/images/icons_contacts/twitter.svg';
import instagram from '../../../../assets/images/icons_contacts/instagram.svg';
import youtube from '../../../../assets/images/icons_contacts/youtube.svg';
import github from '../../../../assets/images/icons_contacts/github.svg';
import mainLink from '../../../../assets/images/icons_contacts/mainLink.svg';

const icons = {
  facebook,
  website,
  vk,
  twitter,
  instagram,
  youtube,
  github,
  mainLink,
};

// const Contacts = (props) => {
//   let contacts = [];
//   for (let key in props.contacts) {
//     if (props.contacts[key]) {
//       let href = props.contacts[key].startsWith('https://')
//         ? props.contacts[key]
//         : 'https://' + props.contacts[key];
//       contacts.push(
//         <a href={href} target={`_blank`} key={key}>
//           <img src={icons[key]} alt={''} />
//         </a>,
//       );
//     }
//   }
//   return (
//     <>
//       <b>My contacts:</b>
//       <div>{contacts}</div>
//     </>)
// };

const Contacts = (props) => {
  return <>
    <b>My contacts:</b>
    <div>
      {Object.keys(props.contacts).filter(key => props.contacts[key] !== null).map(key => {
        if (props.contacts[key]) {
          let href = props.contacts[key].startsWith('https://')
            ? props.contacts[key]
            : 'https://' + props.contacts[key];

          return <a href={href} target={`_blank`} key={key}>
            <img src={icons[key]} alt={''}/>
          </a>
        }
      })}
    </div>
  </>
};

export default Contacts;
