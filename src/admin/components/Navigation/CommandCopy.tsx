import { Badge, Command, Text, TooltipProvider } from '@medusajs/ui';
import { FC } from 'react';

export interface CommandCopyProps {
  url: string;
  navigationId: string;
}

const CommandCopy: FC<CommandCopyProps> = (props) => {
  const { url, navigationId } = props;
  return (
    <div className="w-full flex flex-col space-y-4 py-4">
      <Text>Url of Navigation</Text>
      <TooltipProvider>
        <Command>
          <Badge color="green">Get</Badge>
          <code>{`${url}/store/navigation/${navigationId}`}</code>
          <Command.Copy
            content={`${url}/store/navigation/${navigationId}`}
            className="ml-auto"
          />
        </Command>
      </TooltipProvider>
    </div>
  );
};

export default CommandCopy;
