import React, { MouseEventHandler } from 'react';
import { CPageContainerStyled } from '@comm100/styledComponents/Page/CPageContainerStyled';
import { CPageContentStyled } from '@comm100/styledComponents/Page/CPageContentStyled';
import { CPageHeaderContentStyled } from '@comm100/styledComponents/Page/CPageHeaderContentStyled';
import { CPageHeaderStyled } from '@comm100/styledComponents/Page/CPageHeaderStyled';
import { CPageMainContainerStyled } from '@comm100/styledComponents/Page/CPageMainContainerStyled';
import { CPageMainWrapperStyled } from '@comm100/styledComponents/Page/CPageMainWrapperStyled';
import { CPageTitleContainerStyled } from '@comm100/styledComponents/Page/CPageTitleContainerStyled';
import { CPageTitleStyled } from '@comm100/styledComponents/Page/CPageTitleStyled';
import { CDivider } from '@comm100/framework/Components/CDivider';
import { CHtmlText } from '@comm100/framework/Components/CHtmlText';
import { CPageDescStyled } from '@comm100/styledComponents/Page/CPageDescStyled';
import { CGoBack } from './CGoBack';

export type DescriptionPosition = 'tooltip' | 'belowTitle';

export interface CPageProps {
  id?: string;
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  isInDrawer?: boolean;
  onClickGoBack?: MouseEventHandler;
}

export const CPage = ({
  id,
  title,
  children,
  description,
  isInDrawer,
  onClickGoBack
}: CPageProps) => {
  return (
    <CPageContainerStyled isInDrawer={isInDrawer}>
      <CPageContentStyled>
        <CPageMainWrapperStyled>
          <CPageMainContainerStyled id={id}>
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
                {description && (
                  <CPageDescStyled data-tag='description'>
                    {typeof description === 'string' ? (
                      <CHtmlText content={description} />
                    ) : (
                      description
                    )}
                  </CPageDescStyled>
                )}
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
