import React from 'react';
import { useTranslation } from 'react-i18next';

export default function B2BLabel({ title }: { title: string }) {
  const { t } = useTranslation();
  return (
    <label className="block mb-2 text-xs font-medium lg:text-sm ">
      <p>{t(title)}</p>
    </label>
  );
}
