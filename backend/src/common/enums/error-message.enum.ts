export enum ErrorMessage {
  FACTORY_ALREADY_REGISTERED = 'Fábrica já cadastrada',
  FACTORY_NOT_FOUND = 'Fábrica não encontrada',
  FACTORY_NAME_ALREADY_USED = 'Nome da fábrica já está em uso',
  FACTORY_ALREADY_DELETED = 'Fábrica já Desativada',
  FACTORY_ALREADY_EXIST_IN_DELETED_FACTORY = 'Fábrica inativa já possui esse nome',

  USER_NOT_FOUND = 'Usuário não encontrado',
  USER_ALREADY_ASSIGNED_TO_FACTORY = 'Usuário já registrado em uma fábrica',
  USERNAME_ALREADY_EXISTS = 'Nome de usuário já existe',
  USER_ALREADY_DELETED = 'Usuário já Desativada',
  USERNAME_ALREADY_EXIST_IN_DELETED_USER = 'Usuário inativo já possui esse nome',

  MACHINE_NAME_ALREADY_EXISTS = 'Nome da máquina já existe',
  MACHINE_NOT_FOUND = 'Máquina não encontrada',
  MACHINE_NOT_FOUND_IN_FACTORY = 'Máquina não encontrada nesta fábrica',
  MACHINE_NAME_USED_IN_OTHER_FACTORY = 'Nome da máquina já usado em outra fábrica',
  MACHINE_ALREADY_DELETED = 'Máquina já Desativado',
  MACHINE_ALREADY_EXIST_IN_DELETED_MACHINE = 'Máquina inativa já possui esse nome',

  REGISTRY_NOT_FOUND = 'Registro não encontrado',

  UNAUTHORIZED = 'Credenciais inválidas',
  OPERATOR_INFO_NOT_FOUND = 'Informações do operador não encontradas',

  FIELD_INVALID = 'campo invalido',
}
