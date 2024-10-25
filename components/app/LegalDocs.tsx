import React from 'react';

import { useTranslation } from 'react-i18next';
import { Collapsible } from '../base/Collapsible';
import { AppearanceSwitch } from '../layout/AppearanceSwitch';
import { DocumentsIcon } from '../Icons/DocumentsIcon';

export const LegalDocs: React.FC = () => {
	const { t } = useTranslation();

	return (
		<Collapsible title={t('profile.legal')} icon={<DocumentsIcon width={30} height={30} />}>
			<AppearanceSwitch />
		</Collapsible>
	);
};
