import styled from 'styled-components';

const AstroDivider = styled.div`
  margin: 0 auto;
  width: 400px;
  max-width: 100%;
  position: relative;
`;

const AstroDividerMask = styled.div`
  overflow: hidden;
  height: 5px;
  
  &:after {
    content: '';
    display: block;
    margin: -25px auto 0;
    width: 100%;
    height: 25px;
    border-radius: 125px / 12px;
    box-shadow: 0 0 8px #049372;
  }
`;

const AstroDividerSpan = styled.span`
  width: 25px;
  height: 25px;
  position: absolute;
  bottom: 100%;
  margin-bottom: -25px;
  left: 50%;
  margin-left: -25px;
  border-radius: 100%;
  box-shadow: 0 2px 4px #4fb39c;
  background: #fff;
`;

const AstroDividerI = styled.i`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  right: 4px;
  border-radius: 100%;
  border: 1px dashed #68beaa;
  text-align: center;
  line-height: 40px;
  font-style: normal;
  color: #049372;
`;
const CircleDevider=()=>{
  return (
    <AstroDivider>
      <AstroDividerMask>
      </AstroDividerMask>
    </AstroDivider>
  );
}
export default CircleDevider;
