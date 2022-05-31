import React, { MouseEventHandler } from 'react';
import { Helmet } from 'react-helmet';
import { CPageContainerStyled } from '@comm100/styledComponents/Page/CPageContainerStyled';
import { CPageContentStyled } from '@comm100/styledComponents/Page/CPageContentStyled';
import { CPageHeaderContentStyled } from '@comm100/styledComponents/Page/CPageHeaderContentStyled';
import { CPageHeaderStyled } from '@comm100/styledComponents/Page/CPageHeaderStyled';
import { CPageMainContainerStyled } from '@comm100/styledComponents/Page/CPageMainContainerStyled';
import { CPageMainWrapperStyled } from '@comm100/styledComponents/Page/CPageMainWrapperStyled';
import { CPageTitleContainerStyled } from '@comm100/styledComponents/Page/CPageTitleContainerStyled';
import { CPageTitleStyled } from '@comm100/styledComponents/Page/CPageTitleStyled';
import { CDivider } from '@comm100/framework/Components/CDivider';
import { CGoBack } from './CGoBack';

export type DescriptionPosition = 'tooltip' | 'belowTitle';

export interface CPageProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  onClickGoBack?: MouseEventHandler;
}

export const CPage = ({ id, title, children, onClickGoBack }: CPageProps) => {
  return (
    <CPageContainerStyled>
      <CPageContentStyled>
        <CPageMainWrapperStyled>
          <CPageMainContainerStyled id={id}>
            {title && typeof title === 'string' && (
              <Helmet>
                <title>{title}</title>
              </Helmet>
            )}
            {
              <CPageHeaderStyled>
                <CPageTitleContainerStyled>
                  {title && (
                    <CPageTitleStyled id={`${id}-title`}>
                      {title}
                    </CPageTitleStyled>
                  )}
                  <CPageHeaderContentStyled>
                    {onClickGoBack && (
                      <>
                        <CDivider orientation='vertical' flexItem />
                        <CGoBack onClick={onClickGoBack} />
                      </>
                    )}
                  </CPageHeaderContentStyled>
                </CPageTitleContainerStyled>
              </CPageHeaderStyled>
            }
            {children}
          </CPageMainContainerStyled>
        </CPageMainWrapperStyled>
      </CPageContentStyled>
    </CPageContainerStyled>
  );
};
CPage.displayName = 'CPage';
