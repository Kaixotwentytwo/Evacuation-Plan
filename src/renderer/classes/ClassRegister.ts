// этот файл содержит в себе все допустимые классы.
// это необходимо для обеспечения корректной работы копирования\вставки и безопасности.

import { Icon } from "./obstacles/Icon";
import { InWall } from "./obstacles/InWall";
import { OutWall } from "./obstacles/OutWall";

export const ClassRegister: Record<string, any> = {
    'OutWall': OutWall,
    'InWall': InWall,
    'Icon': Icon
};