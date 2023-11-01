import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Portal, Text, TextInput, Dialog } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editando, setEditando] = useState(false);
  const [tarefaSendoEditada, setTarefaSendoEditada] = useState(null);
  const [showModalExcluirTarefa, setShowModalExcluirTarefa] = useState(false);
  const [tarefaParaExcluir, setTarefaParaExcluir] = useState(null);

  useEffect(() => {
    async function loadTarefas() {
      try {
        const storedTarefas = await AsyncStorage.getItem('tarefas');
        if (storedTarefas) {
          setTarefas(JSON.parse(storedTarefas));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas: ', error);
      }
    }
    loadTarefas();
  }, []);

  async function salvarTarefas(tarefasToSave) {
    try {
      await AsyncStorage.setItem('tarefas', JSON.stringify(tarefasToSave));
    } catch (error) {
      console.error('Erro ao salvar tarefas: ', error);
    }
  }

  function adicionarTarefa() {
    if (inputValue) {
      const novaListaTarefas = [...tarefas, inputValue];
      setTarefas(novaListaTarefas);
      salvarTarefas(novaListaTarefas);
      setInputValue('');
    }
  }

  function editarTarefa() {
    if (tarefaSendoEditada) {
      const index = tarefas.indexOf(tarefaSendoEditada);
      const novaListaTarefas = [...tarefas];
      novaListaTarefas[index] = inputValue;
      setTarefas(novaListaTarefas);
      salvarTarefas(novaListaTarefas);
      setEditando(false);
      setInputValue('');
      setTarefaSendoEditada(null);
    }
  }

  function excluirTarefa(tarefa) {
    setTarefaParaExcluir(tarefa);
    setShowModalExcluirTarefa(true);
  }

  function confirmarExclusao() {
    if (tarefaParaExcluir) {
      const novaListaTarefas = tarefas.filter(item => item !== tarefaParaExcluir);
      setTarefas(novaListaTarefas);
      salvarTarefas(novaListaTarefas);
      setShowModalExcluirTarefa(false);
    }
  }

  function cancelarExclusao() {
    setTarefaParaExcluir(null);
    setShowModalExcluirTarefa(false);
  }

  function handleEditartarefa(tarefa) {
    setTarefaSendoEditada(tarefa);
    setInputValue(tarefa);
    setEditando(true);
  }

  function handleButton() {
    if (editando) {
      editarTarefa();
    } else {
      adicionarTarefa();
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ flex: 4 }}
          mode='outlined'
          label='Tarefa'
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Button
          style={styles.button}
          mode='contained'
          onPress={handleButton}
        >
          {editando ? 'Editar' : 'Adicionar'}
        </Button>
      </View>
      <FlatList
        style={styles.list}
        data={tarefas}
        renderItem={({ item }) => (
          <Card style={styles.card} mode='outlined'>
            <Card.Content style={styles.cardContent}>
              <Text variant='titleMedium' style={{ flex: 1 }}>{item}</Text>
              <IconButton icon='pen' onPress={() => handleEditartarefa(item)} />
              <IconButton icon='trash-can-outline' onPress={() => excluirTarefa(item)} />
            </Card.Content>
          </Card>
        )}
      />
      <Portal>
        <Dialog visible={showModalExcluirTarefa} onDismiss={cancelarExclusao}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir esta tarefa?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={cancelarExclusao}>Cancelar</Button>
            <Button onPress={confirmarExclusao}>Excluir</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '95%',
    paddingTop: 10,
    gap: 5,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '95%',
    marginTop: 10,
  },
  card: {
    margin: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});