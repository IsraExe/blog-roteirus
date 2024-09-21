import { ElementType } from 'react';

type ModalInfoProps = {
  title: string;
  information: string;
  icon: ElementType;
};

export const ModalInfo = ({ title, information, icon: Icon }: ModalInfoProps) => {
  return (
    <div className="text-center">
      <div>
        <Icon className="text-green-600" style={{ fontSize: 40 }} />
      </div>
      <div>
        <h2 className="text-xl font-semibold">
          {title}
        </h2>
        <p className="text-gray-500 mb-4">
          {information}
        </p>
      </div>
    </div>
  );
};
