import React from 'react';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import { FaInstagram, FaFacebookSquare, FaPinterestSquare, FaTwitterSquare, FaYoutube } from 'react-icons/fa';
import Helmet from 'react-helmet';

const Wrapper = styled.header`
  -webkit-clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    -webkit-clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
    clip-path: polygon(100% 0, 0 0, 0 90%, 50% 100%, 100% 90%);
  }
  background: ${props => props.theme.gradient.rightToLeft};
  height: 300px;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 300px;
  }
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    height: 275px;
  }
  position: relative;
  overflow: hidden;
`;

const Text = styled.div`
  color: ${props => props.theme.colors.white.base};
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: ${props => props.theme.layout.base};
  padding: 0 2rem;
  margin-bottom: 0rem;
  align-items: center;
  h1 {
    @media (max-width: ${props => props.theme.breakpoints.s}) {
      font-size: 1.5rem;
    }
    margin-bottom: 0rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  a {
    margin-right: 10px;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors.white.light};
`;

const Header = ({ children, title, date, subtitle, cover, socialDetails }) => (
  <Wrapper>
    <Helmet>
      <script src="//w.likebtn.com/js/w/widget.js"></script>
    </Helmet>
    {cover && typeof cover === 'object' &&
      <Img fluid={cover || {} || [] || ''} />
    }
    {cover && typeof cover === 'string' &&
      <img src={cover || {} || [] || ''} style={{ width: '100%', objectFit: 'fill', objectPosition: '50% 50%' }} />
    }
    <Text>
      <h1>{title}</h1>
      <h4>{subtitle}</h4>
      {socialDetails &&
        <SocialIcons>
          {socialDetails.InstagramLink &&
            <a href={socialDetails.InstagramLink} target="_blank"><FaInstagram size="32" color="black" /></a>
          }
          {socialDetails.FacebookLink &&
            <a href={socialDetails.FacebookLink} target="_blank"><FaFacebookSquare size="32" color="black" /></a>
          }
          {socialDetails.PinterestLink &&
            <a href={socialDetails.PinterestLink} target="_blank"><FaPinterestSquare size="32" color="black" /></a>
          }
          {socialDetails.TwitterLink &&
            <a href={socialDetails.TwitterLink} target="_blank"><FaTwitterSquare size="32" color="black" /></a>
          }
          {socialDetails.YouTubeLink &&
            <a href={socialDetails.YouTubeLink} target="_blank"><FaYoutube size="32" color="black" /></a>
          }
        </SocialIcons>
      }
      <span 
        className="likebtn-wrapper" 
        datatheme="custom" 
        dataicon_l="str2-o" 
        dataicon_d="alrt2" 
        dataicon_l_c_v="#ff4f00" 
        databg_c="rgba(255,255,255,0)" 
        dataicon_d_c_v="#ff4f00" 
        dataf_family="Courier New" 
        datalabel_fs="r" 
        datai18n_like="favorite" 
        dataef_voting="heartbeat" 
        datawhite_label="true" 
        datarich_snippet="true" 
        dataidentifier="@STORE_NAME" 
        dataitem_url="@PAGE_URL" 
        dataitem_title="@STORE_NAME" 
        dataitem_image="@PROFILE_IMAGE" 
        datalazy_load="true" 
        datatooltip_enabled="false" 
        datai18n_dislike="warning" 
        datai18n_like_tooltip="mark as favorite" 
        datai18n_unlike_tooltip="remove" 
        datai18n_undislike_tooltip="undo">
      </span>
      {children && <Subtitle dangerouslySetInnerHTML={{ __html: children }} />}
    </Text>
  </Wrapper>
);

export default Header;

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  cover: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.bool,
  ]),
};

Header.defaultProps = {
  children: false,
  cover: false,
  date: false,
  subtitle: false,
  title: false,
};
