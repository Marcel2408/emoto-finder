/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@material-ui/core';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { AppState, Provider } from '../store/types';
import { RootState } from '../store';
import { updateFavouriteProviders } from '../store/actions';
import { ProviderHeader, ProvidersContainerDiv, FlexWrapper } from './ProvidersStyle';

interface IProvidersProps {}

export const Providers: React.FC<IProvidersProps> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const provStorecopy: any = [...user.providers];
  const userId = user._id;
  const [providersState, setProvidersState] = useState(provStorecopy);
  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    provider: Provider
  ) => {
    setProvidersState(
      providersState.map((prov: { name: string; isFiltered: boolean }) => {
        if (prov.name === provider.name) {
          // eslint-disable-next-line no-param-reassign
          prov.isFiltered = event.target.checked;
          return prov;
        }
        return prov;
      })
    );
  };
  const handleSaveProviders = () => {
    dispatch(updateFavouriteProviders(userId, providersState));
    history.push('/map');
  };

  return (
    <FlexWrapper>
      <ProviderHeader>
        <button
          type='button'
          onClick={handleSaveProviders}
          style={{
            position: 'absolute',
            height: '100%',
            left: '0',
            top: '0',
            border: 'none',
            backgroundColor: 'transparent',
            padding: '0',
            marginLeft: '.2em' }}
        >
          <ArrowBackIosOutlinedIcon style={{
            color:'white', fontSize: '200%' }}
          />
        </button>
        <span>Providers
        </span>
      </ProviderHeader>
      <ProvidersContainerDiv>
        <FormControl component="fieldset">
          <FormGroup>
            {user.providers.map((provider, i) => (
              <div
                key={provider.name}
                style={{
                  marginBottom: '.35em',
                }}
              >
                <FormControlLabel
                  label={provider.name}
                  control={
                    <Switch
                      checked={provider.isFiltered}
                      onChange={(event) => handleChange(event, provider)}
                      name={provider.name}
                      color="primary"
                    />
                }
                />
              </div>
            ))}
          </FormGroup>
        </FormControl>
        <Button
          variant="contained"
          type="button"
          onClick={handleSaveProviders}
          style={{
            padding: '.5em 3em',
            backgroundColor:'#ffa40b',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          SAVE
        </Button>
      </ProvidersContainerDiv>
    </FlexWrapper>
  );
};

const mapStateToProps = (state: AppState) => ({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Providers);
